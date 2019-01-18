export class JsonSchemas {
  private static newUser: any = {
    title: "NewUser",
    description: "describes properties required to create a user",
    type: "object",
    required: ["username", "password", "email", "mobile"],
    properties: {
      username: {
        type: "string",
        description: "username of user"
      },
      password: {
        type: "string",
        description: "password of user"
      },
      email: {
        type: "string",
        description: "email id of user"
      },
      mobile: {
        type: "number",
        description: "mobile number of user"
      },
      role: {
        type: "string",
        description: "Role of user"
      }
    }
  };
  public static get NewUser() {
    return this.newUser;
  }
}