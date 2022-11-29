import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { QRCodeSVG } from 'qrcode.react';
import { QRCodeCanvas } from 'qrcode.react';
import Speech from 'react-speech';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './page.reducer';

export const PageDetail = () => {
  const dispatch = useAppDispatch();
  const styles = {
    width: '28',
    height: '28',
    cursor: 'pointer',
    pointerEvents: 'none',
    outline: 'none',
    backgroundColor: 'yellow',
    border: 'solid 1px rgba(255,255,255,1)',
    borderRadius: 6,
  };

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pageEntity = useAppSelector(state => state.page.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pageDetailsHeading">Page</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{pageEntity.id}</dd>
          <dt>
            <span id="url">Url</span>
          </dt>
          <dd>{pageEntity.url}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{pageEntity.title}</dd>
          <dt>
            <span id="text">Text</span>
          </dt>

          <dd>{pageEntity.text}</dd>
          <Speech textAsButton={true} style={{ width: '50px', height: '50px' }} displayText="Ouvir o texto" text={`${pageEntity.text}`} />
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {pageEntity.image ? (
              <div>
                {pageEntity.imageContentType ? <a onClick={openFile(pageEntity.imageContentType, pageEntity.image)}>Open&nbsp;</a> : null}
                <span>
                  {pageEntity.imageContentType}, {byteSize(pageEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="logo">Logo</span>
          </dt>
          <dd>
            {pageEntity.logo ? (
              <div>
                {pageEntity.logoContentType ? <a onClick={openFile(pageEntity.logoContentType, pageEntity.logo)}>Open&nbsp;</a> : null}
                <span>
                  {pageEntity.logoContentType}, {byteSize(pageEntity.logo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="qrcode">Qrcode</span>
          </dt>
          <dd>{pageEntity.qrcode}</dd>
        </dl>
        <div>
          <QRCodeCanvas value={`${pageEntity.qrcode}`} />
        </div>
        <Button tag={Link} to="/page" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/page/${pageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PageDetail;
