export const mentionUser = (user: string) => {
  return `<@${user}>`
}

export const mentionUsers = (users: string[]) => {
  return users.map((user) => mentionUser(user)).join(' ')
}
