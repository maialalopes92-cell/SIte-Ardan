type BudgetEmailInput = {
  requestId: string;
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

const MAX_EMAIL_ATTACHMENTS = 3;
const MAX_EMAIL_ATTACHMENT_BYTES = 2.5 * 1024 * 1024;

type EmailAttachment = {
  filename: string;
  content: string;
  contentType: string;
  size: number;
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const prepareEmailAttachments = async (files: File[]) => {
  const attachments: EmailAttachment[] = [];
  const skippedFiles: string[] = [];
  let totalBytes = 0;

  for (const file of files) {
    const nextTotal = totalBytes + file.size;
    const canAttach =
      attachments.length < MAX_EMAIL_ATTACHMENTS &&
      nextTotal <= MAX_EMAIL_ATTACHMENT_BYTES;

    if (!canAttach) {
      skippedFiles.push(file.name);
      continue;
    }

    attachments.push({
      filename: file.name,
      content: await fileToBase64(file),
      contentType: file.type || "application/octet-stream",
      size: file.size,
    });
    totalBytes = nextTotal;
  }

  return { attachments, skippedFiles };
};

export const sendBudgetEmail = async (input: BudgetEmailInput) => {
  const { attachments, skippedFiles } = await prepareEmailAttachments(input.files);

  const response = await fetch("/api/send-budget-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...input,
      files: undefined,
      fileCount: input.files.length,
      attachments,
      skippedFiles,
    }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar o email da solicitação.");
  }
};
