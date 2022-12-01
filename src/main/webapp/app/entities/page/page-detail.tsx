import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import QRCode from 'react-qr-code';
import Speech from 'react-speech';

import { getEntity } from './page.reducer';

export const PageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const qrcode = window.location.pathname;
  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pageEntity = useAppSelector(state => state.page.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pageDetailsHeading">Nome da Página</h2>
        <dl className="jh-entity-details">
          <span id="title">Titulo</span>

          <dd>{pageEntity.title}</dd>
          <dt>
            <span id="text">Texto descrição</span>
          </dt>
          <dd>{pageEntity.text}</dd>

          <dt>
            <span id="qrcode">Qrcode</span>
          </dt>
          <dd>
            <QRCode size={256} style={{ height: 'auto', maxWidth: '10%', width: '10%' }} value={`${qrcode}`} viewBox={`0 0 256 256`} />
          </dd>
        </dl>
        <div>
          <Speech
            Speech
            style={{ width: '28', height: '28', cursor: 'pointer', pointerEvents: 'none', outline: 'none', backgroundColor: 'yellow' }}
            textAsButton={true}
            displayText="Ouvir Texto"
            text={`${pageEntity.text}`}
          />
          ,
        </div>
        <Button tag={Link} to="/page" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/page/${pageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 64, width: '100%' }}></div>
      </Col>
    </Row>
  );
};

export default PageDetail;
