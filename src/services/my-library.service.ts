import axiosInstance from "@/config/axios";
import { MyLibraryEntity } from "@/entities/my-library.entity";

export class MyLibraryService {
  private static _instance: MyLibraryService;
  private prefix = "/my-libraries";
  private delete_this_song = "/delete-this-song";
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

  public async getMany(): Promise<{ rows: MyLibraryEntity[]; count: number }> {
    const res = await axiosInstance.get(this.prefix, {
      params: {
        options: JSON.stringify(this.query),
      },
    });
    this.query = {};
    return res.data;
  }

  /**
   * get songs by userId
   * @param userId: string
   * @returns rows and count
   */

  public async getSongsByUserId(
    userId: string
  ): Promise<{ rows: MyLibraryEntity[]; count: number }> {
    this.query = { where: { user: userId }, populate: "songs" };
    const res = await axiosInstance.get(this.prefix, {
      params: {
        options: JSON.stringify(this.query),
      },
    });
    this.query = {};
    return res.data;
  }

  public async checkIsExistThisSong(
    songId: string,
    userId: string
  ): Promise<boolean> {
    this.query = {
      where: {
        user: userId,
        songs: {
          $in: songId,
        },
      },
    };
    const res = await axiosInstance.get(this.prefix, {
      params: {
        options: JSON.stringify(this.query),
      },
    });
    this.query = {};
    return res.data.rows.length ? true : false;
  }

  /**
   * create One
   * @returns
   */

  public async createOne(songId: string): Promise<MyLibraryEntity> {
    const res = await axiosInstance.post(this.prefix, { songs: [songId] });
    return res.data;
  }

  /**
   * handle remove this song in my library
   */

  public async removeSong(
    songId: string,
    userId: string
  ): Promise<MyLibraryEntity> {
    const res = await axiosInstance.post(this.prefix + this.delete_this_song, {
      filter: {
        user: userId,
      },
      update: {
        $pull: {
          songs: songId,
        },
      },
    });
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
