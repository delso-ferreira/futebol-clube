export default function MapResponseStatus(status: string): number {
  switch (status) {
    case 'SUCESS': return 200;
    case 'UPDATE': return 201;
    case 'CREATED': return 201;
    case 'BAD_REQUEST': return 401;
    case 'INVALID_DATA': return 400;
    case 'UNAUTHORIZED': return 422;
    case 'NOT_FOUND': return 404;
    default: return 500;
  }
}
