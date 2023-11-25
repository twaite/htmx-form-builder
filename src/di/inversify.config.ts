import { Container } from 'inversify';
import { FormRepository, StepRepository } from 'app/repo';

const container = new Container();
container.bind<FormRepository>(FormRepository).toSelf();
container.bind<StepRepository>(StepRepository).toSelf();

export { container };
