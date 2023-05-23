import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from '../schemas/bookmark.schema';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './edit-dto';

@Injectable({})
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}
  async getBookmarks(userId: number) {
    console.log(userId);
    return await this.bookmarkModel.find({ userId: JSON.stringify(userId) });
  }

  getBookmarkById(userId: number, bookmarkId: number) {}

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = new this.bookmarkModel({ userId, ...dto });
    return bookmark.save();
  }

  editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
