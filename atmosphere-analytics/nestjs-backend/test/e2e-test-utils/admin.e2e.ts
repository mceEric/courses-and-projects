import * as pactum from 'pactum';
import { StudyDto } from 'src/study/dto/study.dto';

export function adminTests() {
  describe('Admin', function () {
    describe('Study Creation', function () {
      const dto: StudyDto = {
        name: 'Another Test Study',
        shortName: 'TS',
        description: 'Test',
        objective: 'Test',
        questionnaire: [],
        frequency: '1d',
      };
      it('Should throw error if no jwt is present', () => {
        return pactum
          .spec()
          .post('/admin/studies')
          .withBody(dto)
          .expectStatus(401);
      });

      it('Should create study', () => {
        return pactum
          .spec()
          .post('/admin/studies')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{researcher-jwt}' })
          .expectStatus(201)
          .stores('studyId', 'createdStudy._id');
      });

      it('Should throw error if study name already exists', () => {
        return pactum
          .spec()
          .post('/admin/studies')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{researcher-jwt}' })
          .expectStatus(409);
      });
    });

    describe('Study Deletion', function () {
      it('Should throw error if no jwt is present', () => {
        return pactum
          .spec()
          .delete('/admin/studies/{studyId}')
          .withPathParams('studyId', '$S{studyId}')
          .expectStatus(401);
      });

      it('Should throw error if user is not admin', () => {
        return pactum
          .spec()
          .delete('/admin/studies/{studyId}')
          .withPathParams('studyId', '$S{studyId}')
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(401);
      });

      it('Should get study data', () => {
        return pactum
          .spec()
          .get('/studies/{studyId}')
          .withPathParams('studyId', '$S{studyId}')
          .expectStatus(200);
      });

      it('Should delete study', () => {
        return pactum
          .spec()
          .delete('/admin/studies/{studyId}')
          .withPathParams('studyId', '$S{studyId}')
          .withHeaders({ Authorization: 'Bearer $S{researcher-jwt}' })
          .expectStatus(200);
      });

      it('Should throw error if study does not exist', () => {
        return pactum
          .spec()
          .delete('/admin/studies/{studyId}')
          .withPathParams('studyId', '$S{studyId}')
          .withHeaders({ Authorization: 'Bearer $S{researcher-jwt}' })
          .expectStatus(404);
      });
    });

    describe('User deletion', () => {
      it('Should throw error if no jwt is present', () => {
        return pactum
          .spec()
          .delete('/admin/participant/{participant-id}')
          .withPathParams('participant-id', '$S{participant-id}')
          .expectStatus(401);
      });

      it('Should throw error if user is not admin', () => {
        return pactum
          .spec()
          .delete('/admin/participant/{participant-id}')
          .withPathParams('participant-id', '$S{participant-id}')
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(401);
      });

      it('Should throw error is user does not exist', () => {
        return pactum
          .spec()
          .delete('/admin/participant/63dbff7f30fa6f9906082eb1')
          .withHeaders({ Authorization: 'Bearer $S{researcher-jwt}' })
          .expectStatus(404);
      });

      it('Should delete previously created account', () => {
        return pactum
          .spec()
          .delete('/admin/participant/{participant-id}')
          .withPathParams('participant-id', '$S{participant-id}')
          .withHeaders({ Authorization: 'Bearer $S{researcher-jwt}' })
          .expectStatus(200);
      });
    });
  });
}
