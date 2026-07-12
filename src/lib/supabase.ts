const env = import.meta.env as Record<string, string | undefined>;

const fallbackSupabaseUrl = "https://rxlhfupyltngdjsfjfwu.supabase.co";
const fallbackSupabaseKey = "sb_publishable_48ekUG9Oq6sO-qj2d6HMyw_fXA12Oe6";

const supabaseUrl = (env.VITE_SUPABASE_URL || fallbackSupabaseUrl).replace(/\/$/, "");
const supabaseKey =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  fallbackSupabaseKey;

const budgetAttachmentsBucket = "budget-attachments";

type BudgetRequestInput = {
  serviceType: string;
  estimatedAreaM2: number;
  location: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string;
  whatsappMessage: string;
  files: File[];
};

type SupabaseBudgetRequestRow = {
  id: string;
};

type SupabaseError = {
  message?: string;
  error_description?: string;
  details?: string;
};

const getSupabaseHeaders = (contentType = "application/json") => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase não está configurado.");
  }

  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": contentType,
  };
};

const parseSupabaseError = async (response: Response) => {
  try {
    const error = (await response.json()) as SupabaseError;
    return (
      error.message ||
      error.error_description ||
      error.details ||
      "Não foi possível salvar os dados no Supabase."
    );
  } catch {
    return "Não foi possível salvar os dados no Supabase.";
  }
};

const sanitizeFileName = (fileName: string) =>
  fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const encodeStoragePath = (path: string) =>
  path.split("/").map(encodeURIComponent).join("/");

const uploadBudgetFiles = async (requestId: string, files: File[]) => {
  if (files.length === 0) {
    return;
  }

  const uploadedFiles = [];

  for (const file of files) {
    const filePath = `${requestId}/${Date.now()}-${sanitizeFileName(file.name)}`;
    const uploadResponse = await fetch(
      `${supabaseUrl}/storage/v1/object/${budgetAttachmentsBucket}/${encodeStoragePath(filePath)}`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey || "",
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "false",
        },
        body: file,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error(await parseSupabaseError(uploadResponse));
    }

    uploadedFiles.push({
      budget_request_id: requestId,
      file_name: file.name,
      file_path: filePath,
      storage_bucket: budgetAttachmentsBucket,
      mime_type: file.type || null,
      file_size_bytes: file.size,
    });
  }

  const metadataResponse = await fetch(
    `${supabaseUrl}/rest/v1/budget_request_files`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(),
        Prefer: "return=minimal",
      },
      body: JSON.stringify(uploadedFiles),
    }
  );

  if (!metadataResponse.ok) {
    throw new Error(await parseSupabaseError(metadataResponse));
  }
};

export const createBudgetRequest = async (input: BudgetRequestInput) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/budget_requests?select=id`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(),
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        service_type: input.serviceType,
        estimated_area_m2: input.estimatedAreaM2,
        location: input.location || null,
        client_name: input.clientName,
        client_email: input.clientEmail || null,
        client_phone: input.clientPhone,
        description: input.description || null,
        whatsapp_message: input.whatsappMessage,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await parseSupabaseError(response));
  }

  const [createdRequest] =
    (await response.json()) as SupabaseBudgetRequestRow[];

  if (!createdRequest?.id) {
    throw new Error("O Supabase não retornou o código da solicitação.");
  }

  await uploadBudgetFiles(createdRequest.id, input.files);

  return createdRequest;
};
