export type Login = {
  $id: string
  code: number
  message: string
  data: {
    $id: string
    Id: number
    Name: string
    Email: string
    Token: string
  }
}

export type Signup = {
  $id: string
  code: number
  message: string
  data: {
    $id: string
    Id: number
    Name: string
    Email: string
    Token: string
  }
}

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
}

export type ListUsersResponse<T> = {
  page: number
  per_page: number
  totalrecord: number
  total_pages: number
  data: T[]
}

export type DetailUser = {
  $id: string
  id: number
  name: string
  email: string
  profilepicture: string
  location: string
  createdat: string
}

export type Users = {
  id: number
  name: string
  email: string
  profilepicture: string
  location: string
  createdat: string
}

export type UserReqres = {
  id: 7
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export type UsersReqres<T> = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
  support: {
    url: string
    text: string
  }
}
