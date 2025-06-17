import { TestBed } from '@angular/core/testing';

import { ChatBotSService } from './chat-bot-s.service';

describe('ChatBotSService', () => {
  let service: ChatBotSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatBotSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
