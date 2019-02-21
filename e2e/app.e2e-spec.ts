import { TaskMgrPage } from './app.po';

describe('task-mgr App', () => {
  let page: TaskMgrPage;

  beforeEach(() => {
    page = new TaskMgrPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
