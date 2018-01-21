import ApiService from '../src';

const testUrl = 'https://httpbin.org';

const apiService = new ApiService();

test('construct fetch request configuration', () => {
  const getMethod = 'GET';
  const headers = {};
  const payload = { bob: 'the_builder' };
  const fetchConfig = apiService.constructFetchConfig(
    getMethod,
    headers,
    payload
  );

  expect(fetchConfig).toMatchObject(
    {
      method: expect.stringMatching(
        /GET|POST|PUT|PATCH|DELETE/
      ),
      headers: expect.any(Headers),
      body: expect.any(String)
    }
  );
});

test('handle error by printing error message to console', () => {
  const error = "-STUBBED-";
  const consoleErrorSpy = jest.spyOn(console, 'error');
  apiService.handleError(error);
  expect(consoleErrorSpy).toHaveBeenCalledWith("ApiService error: ", error);
})