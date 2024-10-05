import { http, HttpResponse } from 'msw';

interface UserRequestBody {
  documentType: string;
  documentNumber: string;
}

export const handlers = [
  http.get('/api/test', async ({ request }) => {
    return HttpResponse.json({
      message: 'Hello, World!'
    },{
      status: 200,
      statusText: 'OK',
    })
  }),

  http.post('/api/user', async ({ request }) => {
    const data = await request.json() as UserRequestBody;
    const { documentType, documentNumber } = data;

    if (!documentType || !documentNumber) {
      return HttpResponse.json({
        message: 'Invalid request'
      },{
        status: 400,
        statusText: 'Bad Request',
      })
    }

    return HttpResponse.json({
      firstName: 'Kevin',
      secondName: '',
      firstLastName: 'Muñoz',
      secondLastName: 'Rengifo',
      documentType: documentType,
      documentNumber: documentNumber,
      phone: '3152106633'
    },{
      status: 200,
      statusText: 'OK',
    })
  })
];
