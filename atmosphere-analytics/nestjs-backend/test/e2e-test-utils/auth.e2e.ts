import * as pactum from 'pactum';
import { UserDto } from 'src/users/dto/user.dto';

export function authTests() {
  describe('Auth', function () {
    let randomString = '';
    const possibleCharacter =
      'abcdefghijklmnopqrstuvwxyz0123456789QAZXSWEDCVFRTGBNHYMJUIKOLP';

    for (let i = 0; i < 8; i++)
      randomString += possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length),
      );

    const dto: UserDto = {
      username: `${randomString}@gmail.com`,
      firstName: 'Eric',
      lastName: 'Test',
      password: 'r43rFe$£fed!',
    };

    describe('Participant signup', () => {
      it('Should throw error if first and last names are empty', () => {
        return pactum
          .spec()
          .post('/participant/signup')
          .withBody({ username: dto.username, password: dto.password })
          .expectStatus(400);
      });

      it('Should throw error if username is empty', () => {
        return pactum
          .spec()
          .post('/participant/signup')
          .withBody({
            firstName: dto.firstName,
            lastName: dto.lastName,
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('Should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/participant/signup')
          .withBody({
            username: dto.username,
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(400);
      });

      it('Should throw error if username already exists', () => {
        return pactum
          .spec()
          .post('/participant/signup')
          .withBody({
            username: "eric@mail.com",
            firstName: dto.firstName,
            lastName: dto.lastName,
            password: dto.password,
          })
          .expectStatus(409);
      });

      it('Should signup if all parameters are correctly provided', () => {
        return pactum
          .spec()
          .post('/participant/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('participant-id', '_id');
      });
    });

    describe('User login', () => {
      it('Should throw error if username empty', () => {
        return pactum
          .spec()
          .post('/participant/login')
          .withBody({ password: 'cdscds' })
          .expectStatus(401);
      });

      it('Should throw error if password empty', () => {
        return pactum
          .spec()
          .post('/participant/login')
          .withBody({ username: 'dswdesw' })
          .expectStatus(401);
      });

      it('Should throw error if password is wrong', () => {
        return pactum
          .spec()
          .post('/participant/login')
          .withBody({ username: dto.username, password: 'Qwert532!$' })
          .expectStatus(401);
      });

      it('Should throw error if email does not exist', () => {
        return pactum
          .spec()
          .post('/participant/login')
          .withBody({ username: 'fakeemail@mail.com', password: dto.password })
          .expectStatus(404);
      });

      it('Should login with participant account if all parameters are correctly provided', () => {
        return pactum
          .spec()
          .post('/participant/login')
          .withBody({ username: dto.username, password: dto.password })
          .expectStatus(201)
          .stores('participant-jwt', 'jwt');
      });

      it('Should throw error if body is empty', () => {
        return pactum.spec().post('/auth/login').expectStatus(404);
      });

      it('Should throw error if admin researcher account password is wrong', () => {
        return pactum
          .spec()
          .post('/researcher/login')
          .withBody({
            username: process.env.ADMIN_USERNAME,
            password: 'Qwert532!$',
          })
          .expectStatus(401);
      });

      it('Should throw error if admin researcher account email does not exist', () => {
        return pactum
          .spec()
          .post('/researcher/login')
          .withBody({
            username: 'fakeemail@mail.com',
            password: process.env.ADMIN_PASSWORD,
          })
          .expectStatus(404);
      });

      it('Should login with admin researcher account if all parameters are correctly provided', () => {
        return pactum
          .spec()
          .post('/researcher/login')
          .withBody({
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
          })
          .expectStatus(201)
          .stores('researcher-jwt', 'jwt');
      });

      describe('User JWT verification', () => {
        it('Should throw error if JWT is invalid', () => {
          return pactum
            .spec()
            .post('/auth/jwt-verification')
            .withBody({ token: 'fdsa34234r3cdfw', isParticipant: false })
            .expectStatus(401);
        });

        it('Should verify JWT', () => {
          return pactum
            .spec()
            .post('/auth/jwt-verification')
            .withBody({ token: '$S{researcher-jwt}', isParticipant: false })
            .expectStatus(201);
        });
      });
    });
  });
}
