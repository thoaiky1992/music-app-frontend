import axiosInstance from "@/config/axios";
import { MusicEntity } from "@/entities/music.entity";

export class MusicSerice {
  private static _instance: MusicSerice;
  private prefix = "/musics";
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

  public async getMany(): Promise<{ rows: MusicEntity[]; count: number }> {
    const res = await axiosInstance.get(this.prefix, {
      params: {
        options: JSON.stringify(this.query),
      },
    });
    this.query = {};
    return res.data;
  }

  /**
   * get muics by id
   * @Param id: string
   * @returns rows and count
   */

  public async getMysicById(id: string): Promise<{ rows: MusicEntity[]; count: number }> {
    this.query = { where: { genre: id }, populate: "genre" };
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
    this.query = { ...this.query, ...options };
    return this;
  }
}
