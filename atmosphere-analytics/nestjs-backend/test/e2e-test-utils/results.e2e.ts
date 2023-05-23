import * as pactum from 'pactum';
import { ResultsDto } from '../../src/results/dto/results.dto';

export function resultsTests() {
  describe('Results', function () {
    describe('Get studies', () => {
      it('Should receive results', () => {
        return pactum
          .spec()
          .get('/results/63dbff7f30fa6f9904095eb4')
          .expectStatus(200);
      });
    });
    const resultDto: ResultsDto = {
      study: '6424cbe6017edc254745af86',
      answers: [
        {
          question: 'Test Question',
          answer: 'Test Answer',
        },
      ],
      date: new Date(),
    };
    describe('Create result', () => {
      it('Should throw error if no JWT is present', () => {
        return pactum.spec().post('/results').expectStatus(401);
      });
      it('Should throw error if no body is present', () => {
        return pactum
          .spec()
          .post('/results')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .withBody({
            study: 'Test Study',
          })
          .expectStatus(400);
      });
      it('Should throw error if no answers are present', () => {
        return pactum
          .spec()
          .post('/results')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .withBody({
            study: 'Test Study',
          })
          .expectStatus(400);
      });
      it('Should throw error if no study is present', () => {
        return pactum
          .spec()
          .post('/results')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .withBody({
            answers: [{ question: 'Test Question', answer: 'Test Answer' }],
          })
          .expectStatus(400);
      });
      it('Should create result', () => {
        return pactum
          .spec()
          .post('/results')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .withBody(resultDto)
          .expectStatus(201);
      });
    });
  });
}
