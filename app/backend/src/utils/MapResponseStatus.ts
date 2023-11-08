export default function MapResponseStatus(status: string) : number {
  switch (status) {
    case 'SUCESS': return 200;
    case 'BAD_REQUEST': return 401;
    case 'INVALID_DATA': return 400;
    default: return 500;
  }
}
