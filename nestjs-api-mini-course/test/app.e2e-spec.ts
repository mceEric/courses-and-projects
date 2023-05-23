import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { AppModule } from '../src/app.module';
import { CreateBookmarkDto } from 'src/bookmark/dto';

describe('App e2e', function () {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(5000);
    pactum.request.setBaseUrl('http://localhost:5000');
  });
  afterAll(() => {
    app.close();
  });

  describe('User authorization', function () {
    let randomString = '';
    const charset =
      'abcdefghijklmnopqrstuvwxyz0123456789QAZXSWEDCVFRTGBNHYMJUIKOLP';

    for (let i = 0; i < 8; i++)
      randomString += charset.charAt(
        Math.floor(Math.random() * charset.length),
      );

    const dto: AuthDto = {
      email: `${randomString}@gmail.com`,
      password: '423ef342!fd@',
      username: randomString,
    };

    describe('User signup', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password, username: dto.username })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email, username: dto.username })
          .expectStatus(400);
      });
      it('Should throw if username empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password, email: dto.email })
          .expectStatus(400);
      });
      it('Should throw if body is empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('User login', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: dto.password, username: dto.username })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: dto.email, username: dto.username })
          .expectStatus(400);
      });
      it('Should throw if username empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: dto.password, email: dto.email })
          .expectStatus(400);
      });
      it('Should throw if body is empty', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });

      it('Should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'accessToken');
      });
    });
  });

  describe('User procedure', function () {
    describe('Get me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('Should edit user', () => {
        const dto: EditUserDto = {
          username: 'fdsfdsadsdsaDF',
          email: 'pete@fddsadsasfds.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.username)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', function () {
    describe('Get empty bookmarks', () => {
      it('Should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'www.google.com',
      };
      it('Should create a bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });

    describe('Get bookmarks', () => {});

    describe('Get bookmark by id', () => {});

    describe('Edit bookmark by id', () => {});

    describe('Delete bookmark by id', () => {});
  });
});
