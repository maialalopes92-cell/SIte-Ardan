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
  fileCount: number;
};

export const sendBudgetEmail = async (input: BudgetEmailInput) => {
  const response = await fetch("/api/send-budget-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar o email da solicitação.");
  }
};
