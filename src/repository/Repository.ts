const { app } = window.require('electron').remote;
const Datastore = window.require('nedb-promises');

const dbFactory = (fileName: string) =>
  Datastore.create({
    filename: `${process.env.NODE_ENV === 'development' ? '.' : app.getPath('userData')}/db/${fileName}`,
    timestampData: true,
    autoload: true
  });

interface IRepository {
  competition: Datastore;
  lap: Datastore;
}

export const db: IRepository = {
  competition: dbFactory('competition.db'),
  lap: dbFactory('lap.db')
};
