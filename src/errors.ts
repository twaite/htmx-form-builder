export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    console.error('[Error]: ', message);
  }
}

export class DatabaseError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class NotFoundError extends DatabaseError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
