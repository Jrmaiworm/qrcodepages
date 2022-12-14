package com.jrmaiworm.qrcode.web.rest;

import com.jrmaiworm.qrcode.domain.Page;
import com.jrmaiworm.qrcode.repository.PageRepository;
import com.jrmaiworm.qrcode.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.jrmaiworm.qrcode.domain.Page}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PageResource {

    private final Logger log = LoggerFactory.getLogger(PageResource.class);

    private static final String ENTITY_NAME = "page";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PageRepository pageRepository;

    public PageResource(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    /**
     * {@code POST  /pages} : Create a new page.
     *
     * @param page the page to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new page, or with status {@code 400 (Bad Request)} if the page has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pages")
    public ResponseEntity<Page> createPage(@RequestBody Page page) throws URISyntaxException {
        log.debug("REST request to save Page : {}", page);
        if (page.getId() != null) {
            throw new BadRequestAlertException("A new page cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Page result = pageRepository.save(page);
        return ResponseEntity
            .created(new URI("/api/pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pages/:id} : Updates an existing page.
     *
     * @param id the id of the page to save.
     * @param page the page to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated page,
     * or with status {@code 400 (Bad Request)} if the page is not valid,
     * or with status {@code 500 (Internal Server Error)} if the page couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pages/{id}")
    public ResponseEntity<Page> updatePage(@PathVariable(value = "id", required = false) final Long id, @RequestBody Page page)
        throws URISyntaxException {
        log.debug("REST request to update Page : {}, {}", id, page);
        if (page.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, page.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Page result = pageRepository.save(page);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, page.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pages/:id} : Partial updates given fields of an existing page, field will ignore if it is null
     *
     * @param id the id of the page to save.
     * @param page the page to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated page,
     * or with status {@code 400 (Bad Request)} if the page is not valid,
     * or with status {@code 404 (Not Found)} if the page is not found,
     * or with status {@code 500 (Internal Server Error)} if the page couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pages/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Page> partialUpdatePage(@PathVariable(value = "id", required = false) final Long id, @RequestBody Page page)
        throws URISyntaxException {
        log.debug("REST request to partial update Page partially : {}, {}", id, page);
        if (page.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, page.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Page> result = pageRepository
            .findById(page.getId())
            .map(existingPage -> {
                if (page.getUrl() != null) {
                    existingPage.setUrl(page.getUrl());
                }
                if (page.getTitle() != null) {
                    existingPage.setTitle(page.getTitle());
                }
                if (page.getText() != null) {
                    existingPage.setText(page.getText());
                }
                if (page.getImage() != null) {
                    existingPage.setImage(page.getImage());
                }
                if (page.getImageContentType() != null) {
                    existingPage.setImageContentType(page.getImageContentType());
                }
                if (page.getLogo() != null) {
                    existingPage.setLogo(page.getLogo());
                }
                if (page.getLogoContentType() != null) {
                    existingPage.setLogoContentType(page.getLogoContentType());
                }
                if (page.getQrcode() != null) {
                    existingPage.setQrcode(page.getQrcode());
                }

                return existingPage;
            })
            .map(pageRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, page.getId().toString())
        );
    }

    /**
     * {@code GET  /pages} : get all the pages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pages in body.
     */
    @GetMapping("/pages")
    public List<Page> getAllPages() {
        log.debug("REST request to get all Pages");
        return pageRepository.findAll();
    }

    /**
     * {@code GET  /pages/:id} : get the "id" page.
     *
     * @param id the id of the page to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the page, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pages/{id}")
    public ResponseEntity<Page> getPage(@PathVariable Long id) {
        log.debug("REST request to get Page : {}", id);
        Optional<Page> page = pageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(page);
    }

    /**
     * {@code DELETE  /pages/:id} : delete the "id" page.
     *
     * @param id the id of the page to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pages/{id}")
    public ResponseEntity<Void> deletePage(@PathVariable Long id) {
        log.debug("REST request to delete Page : {}", id);
        pageRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
