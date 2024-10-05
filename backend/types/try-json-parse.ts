declare module 'try-json-parse' {
  function tryToParseJson<T>(
    string: string,
    reviver?: (key: string, value: any) => any,
  ): T | undefined;
  export = tryToParseJson;
}
