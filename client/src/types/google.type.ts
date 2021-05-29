export interface IGoogle {
  accessToken: string;
  googleId: string;
  profileObj: {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
  };
  tokenId: string;
  tokenObj: { expires_in: number };
}
