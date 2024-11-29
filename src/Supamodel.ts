import { type SupabaseClient } from "jsr:@supabase/supabase-js";

type Base = {
  table: string;
  setClient(getter: () => SupabaseClient): void;
  getClient(): SupabaseClient;
};

type RowId<Row> = Row extends { id: infer Id } ? Id : string | number;

export class Supamodel<Row> {
  protected static table: string;
  protected static softDeletes: boolean = false;
  protected static idColumn: string = "id";

  constructor(data: Partial<Row>) {
    Object.assign(this, data);
  }

  private static clientGetter: () => SupabaseClient;

  static setClient(getter: () => SupabaseClient) {
    this.clientGetter = getter;
  }

  static getClient() {
    return this.clientGetter();
  }

  protected get ID() {
    return (this as Record<string, unknown>)[
      (this.constructor as typeof Supamodel).idColumn
    ];
  }

  protected get table() {
    return (this.constructor as typeof Supamodel).table;
  }

  protected get pk() {
    return (this.constructor as typeof Supamodel).idColumn;
  }

  static async $find<Row, TModel extends Supamodel<Row>>(
    this: (new (data: Partial<Row>) => TModel) & typeof Supamodel,
    id: typeof this.idColumn extends keyof Row
      ? Row[typeof this.idColumn]
      : RowId<Row>
  ): Promise<TModel | null> {
    const tablename = this.table;
    const result = await this.getClient()
      .from(tablename)
      .select("*")
      .eq("id", id)
      .single();
    return result.data ? new this(result.data) : null;
  }

  static async find<Row, TModel extends Supamodel<Row>>(
    this: (new (data: Partial<Row>) => TModel) & typeof Supamodel,
    id: typeof this.idColumn extends keyof Row
      ? Row[typeof this.idColumn]
      : RowId<Row>
  ): Promise<{
    data: TModel | null;
    error: Error | null;
  }> {
    const tablename = this.table;
    return await this.getClient()
      .from(tablename)
      .select("*")
      .eq("id", id)
      .single();
  }

  static async $all<Row, TModel extends Supamodel<Row>>(
    this: (new (data: Partial<Row>) => TModel) & Base
  ): Promise<TModel[]> {
    const tablename = this.table;
    const { data, error } = await this.getClient().from(tablename).select("*");
    if (error) throw error;
    return data.map((item: Row) => new this(item));
  }

  static async all<Row, TModel extends Supamodel<Row>>(
    this: (new (data: Partial<Row>) => TModel) & Base
  ): Promise<{
    data: TModel[] | null;
    error: Error | null;
  }> {
    const tablename = this.table;
    return await this.getClient().from(tablename).select("*");
  }

  static make<Row, TModel extends Supamodel<Row>>(
    this: (new (data: Partial<Row>) => TModel) & Base,
    data: Partial<Row>
  ): TModel {
    return new this(data);
  }

  async save(): Promise<this> {
    const tablename = this.table;
    const { error } = await Supamodel.getClient().from(tablename).upsert(this);
    if (error) throw error;
    return this;
  }

  async delete(type: "soft" | undefined = undefined): Promise<void> {
    const tablename = this.table;
    if (type === "soft" && Supamodel.softDeletes === true) {
      const { error } = await Supamodel.getClient()
        .from(tablename)
        .update({ deleted_at: new Date().toISOString() })
        .eq(Supamodel.idColumn, this.ID);
      if (error) throw error;
      return;
    }
    const { error } = await Supamodel.getClient()
      .from(tablename)
      .delete()
      .eq(this.pk, this.ID);
    if (error) throw error;
  }

  async refresh(): Promise<this> {
    const tablename = this.table;
    const result = await Supamodel.getClient()
      .from(tablename)
      .select("*")
      .eq(this.pk, this.ID)
      .single();
    if (result.error) throw result.error;
    Object.assign(this, result.data);
    return this;
  }

  async duplicate(): Promise<this> {
    const tablename = this.table;
    const { id: _id, ...rest } = this as Record<string, RowId<Row>>;
    const { data, error } = await Supamodel.getClient()
      .from(tablename)
      .insert(rest)
      .select()
      .single();
    if (error) throw error;
    return new (this.constructor as new (data: Partial<Row>) => this)(data);
  }
}
