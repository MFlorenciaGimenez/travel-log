import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
  private aiUrl = 'http://127.0.0.1:8000';

  async handleChat(question: string) {
    const res = await axios.post(`${this.aiUrl}/ask`, {
      question,
    });

    return {
      answer: res.data.answer,
    };
  }
}
