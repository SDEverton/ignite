interface IResponseProviderDTO {
  code: number;
  data: {
    barcode: string;
    link: string;
    pdf: {
      charge: string;
    };
    expire_at: string;
    charge_id: number;
    status: string;
    total: number;
    payment: string;
  };
}

export { IResponseProviderDTO };
