import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Chat with AI assistant' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: 'Question to ask the AI assistant',
          example: 'What are the best places to visit in Paris?',
        },
      },
      required: ['question'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'AI response received successfully',
    schema: {
      example: {
        answer: 'Paris is famous for the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral...',
      },
    },
  })
  @ApiResponse({ status: 500, description: 'AI service unavailable' })
  async chat(@Body() body: { question: string }) {
    return this.chatService.handleChat(body.question);
  }
}
