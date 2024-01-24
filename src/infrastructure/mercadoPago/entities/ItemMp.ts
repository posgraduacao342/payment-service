export class ItemMP {
  private readonly unit_measure: string;

  constructor(
    private readonly sku_number: string,
    private readonly title: string,
    private readonly quantity: number,
    private readonly unit_price: number,
    private readonly total_amount: number,
  ) {
    this.unit_measure = 'unit';
  }
}
