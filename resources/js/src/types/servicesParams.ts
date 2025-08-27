export interface EditProfileParams {
  name: string;
  email: string;
  avatar?: any;
  preview: string;
}

export interface ResetPasswordParams {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export interface GetReviewsParams {
  page: number;
  sort: string;
  productID: number;
}

export interface CreateReviewParams {
  rating: number;
  media: File[];
  review: string;
  productID: number;
  name: string;
  email: string;
}
