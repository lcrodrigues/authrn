interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise<Response>(resolve => {
    setTimeout(() => {
      resolve({
        token: 'auehauehauehauehauhea',
        user: {
          name: 'Leonardo',
          email: 'leonardo.cr.rdg@gmail.com',
        },
      });
    }, 2000);
  });
}
