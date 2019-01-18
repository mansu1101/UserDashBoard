
export interface IDBConnection {
  /**
   * Function which provide requested db connection instance.
   * @param next
   * @returns connection instance
   */
  getConnection(next: Function): any;
}