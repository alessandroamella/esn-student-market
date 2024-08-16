import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Ctx, Help, InjectBot, Start } from 'nestjs-telegraf';
import { Telegraf, Context as TelegrafContext } from 'telegraf';
import { Logger } from 'winston';

@Injectable()
export class TelegramBotService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private readonly configService: ConfigService,
  ) {
    this.logger.debug(
      'TelegramBotService has been initialized with token ' +
        this.configService.get<string>('TELEGRAM_BOT_TOKEN'),
    );
  }

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    this.logger.debug('Start command received');
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    this.logger.debug('Help command received');
    await ctx.reply('Help message');
  }
}
