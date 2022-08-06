import axiosInstance from "@/config/axios";
import { GenreEntity } from "@/entities/genre.entity";

export class GenreService {
  private static _instance: GenreService;
  private prefix = "/genres";
  private query = {};

  /**
   *
   * @returns instance
   */
  public static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  /**
   * get All Music
   * @returns rows and count
   */

  public async getMany(): Promise<{ rows: GenreEntity[]; count: number }> {
    const res = await axiosInstance.get(this.prefix, {
      params: {
        options: JSON.stringify(this.query),
      },
    });
    this.query = {};
    return res.data;
  }

  /**
   * bind options to query
   * @returns this
   */

  public findOptions(options: any = {}) {
    this.query = {
      findOptions: { ...options },
    };
    return this;
  }
}
