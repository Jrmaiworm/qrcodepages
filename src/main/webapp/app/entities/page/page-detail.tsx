import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './page.reducer';

export const PageDetail = () => {
  const dispatch = useAppDispatch();

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
