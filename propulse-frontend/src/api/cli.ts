import axios from "axios"

export const sendCommand = (command: string) => {
  return axios.post('http://localhost:8000/cli-command', {
    command: command
  })
}