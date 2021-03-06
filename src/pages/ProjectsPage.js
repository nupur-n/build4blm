import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import NewsletterForm from '../components/NewsletterForm';
import { ProjectsPageTemp } from './ProjectsPageTemp';
import ProjectCard from '../components/ProjectCard';
import ProjectSelectFlow from '../assets/flow_diagrams/project_selection_flow';
import { fetchOpenProjects, allTags } from '../state/utils'
import { createProjects } from '../state/projects';

import '../styling/ProjectsPage.css';

const FilterBar = ({updateFilters, clearFilters, filters}) => (
  <div className="projects-filter-bar">
    <div>
      <span>Filter: </span>
      {allTags.map(tag => (
        <span key={tag} className={`project-filter-tag ${filters[tag] ? 'project-filter-tag-selected' : ''} project-tag`} onClick={() => updateFilters(tag)}>{tag}</span>
      ))}
    </div>
    <span className="project-filter-clear" onClick={clearFilters}>Clear all</span>
  </div>
)

const ProjectsPage = () => {
  const dispatch = useDispatch();

  const getDefaultFilters = () => {
    const defaultFilters = {}
    allTags.forEach((tag) => defaultFilters[tag] = false)
    return defaultFilters
  }

  const savedProjects = useSelector((state) => state.openProjects);
  const [projects, setProjects] = useState(savedProjects);
  const [hasLoaded, setHasLoaded] = useState(false);
  const defaultFilters = getDefaultFilters()
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const doOnSuccess = async (airtableRecords) => {
      await dispatch(createProjects(airtableRecords));
      setProjects(airtableRecords);
      setHasLoaded(true);
    };

    if (savedProjects.length === 0 && !hasLoaded) {
      fetchOpenProjects(doOnSuccess);
    } else {
      setHasLoaded(true);
    }
  }, [dispatch, savedProjects, hasLoaded])

  const updateFilters = (tag) => {
    setFilters({ ...filters, [tag]: !filters[tag]})
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
  }

  const shouldShowProject = (isUrgent, needsPM, projectTags) => {
    if (Object.values(filters).every((val) => !val)) {
      return true
    } else if (isUrgent && filters["Urgent"]) {
      return true
    } else if (needsPM && filters["PM"]) {
      return true
    }
    return projectTags.some((tag) => filters[tag])
  }

  if (hasLoaded && projects.length === 0) {
    return <ProjectsPageTemp />;
  }

  return (
    <Container className="projects-page">
      <Row>
        <h1 className="projects-header">Open Projects</h1>
        <LinkContainer className="projects-matched-button projects-matched-order-2" to={`/matched-projects`}>
          <Button className="primary-button projects-matched-button">See our matched projects!</Button>
        </LinkContainer>
        <ProjectSelectFlow className="flow-images projects-matched-order-1" />
      </Row>
      {hasLoaded ? (
        <>
          <FilterBar updateFilters={updateFilters} clearFilters={clearFilters} filters={filters} />
          <Row className="d-flex justify-content-left">
            {projects.map((project) => (
              shouldShowProject(project.isUrgent, project.needsPM, project.tags) &&
              (
                <Col key={project.id} lg={4} md={6} sm={12}>
                  <ProjectCard project={project} isSelectedView={false} tagSelectedStatus={filters} />
                </Col>
              )
            ))}
          </Row>
        </>
      ) : (
        <Row className="justify-content-center spinner-row">
          <Spinner className="spinner" animation="border" variant="warning" />
        </Row>
      )}
      <Row className="full-width projects-newsletter-banner flex-column align-items-center">
        <h3 className="text-center mb-3">Looking for more?</h3>
        <h5 className="text-center mb-4">Join our newsletter to stay updated on new projects</h5>
        <NewsletterForm />
      </Row>
    </Container>
  );
};

export { ProjectsPage };
