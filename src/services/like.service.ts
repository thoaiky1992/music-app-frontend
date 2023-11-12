import axiosInstance from "@/config/axios";
import { LikeEntity } from "@/entities/like.entity";

export class LikeService {
  private static _instance: LikeService;
  private prefix = "/likes";
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
   * get All
   * @returns rows and count
   */

  public async getMany(): Promise<{ rows: LikeEntity[]; count: number }> {
    const res = await axiosInstance.get(this.prefix, {
      params: {
        options: JSON.stringify(this.query),
      },
    });
    this.query = {};
    return res.data;
  }

  /**
   * create One
   * @returns
   */

  public async createOne(songId: string): Promise<LikeEntity> {
    const res = await axiosInstance.post(this.prefix, { song: songId });
    return res.data;
  }

  /**
   * getOne
   * @returns
   */

  public async getOne(songId: string, userId: string): Promise<LikeEntity> {
    this.query = { where: { song: songId, user: userId } };
    const result = await this.getMany();
    return result.rows[0];
  }

  /**
   * getOne
   * @returns
   */

  public async deleleOne(songId: string, userId: string) {
    const body = { song: songId, user: userId };
    const result = await axiosInstance.post(this.prefix + "/delete", body);
    return result;
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
