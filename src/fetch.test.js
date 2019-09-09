import {makeGameKey, saveDraw} from "./fetch";

global.fetch = require('jest-fetch-mock');

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  it('calls google and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify({name: '-eLjhl465ghvfbjhk'}));

    const gamesParam = [
      {homeUser: {username: 'Zemke', id: 1}, awayUser: {username: 'Khamski', id: 2}},
      {homeUser: {username: 'Kayz', id: 3}, awayUser: {username: 'Koras', id: 4}}];

    const gamesAsPersisted = {
      [makeGameKey(gamesParam[0])]: gamesParam[0],
      [makeGameKey(gamesParam[1])]: gamesParam[1]
    };

    saveDraw(2019, gamesParam);
    const passedToFetch = JSON.parse(fetch.mock.calls[0][1].body);

    console.log("Given");
    console.log(gamesParam);

    console.log("Expected");
    console.log(gamesAsPersisted);

    console.log("Actual");
    console.log(passedToFetch);

    expect(passedToFetch).toEqual(gamesAsPersisted);
  })
});
