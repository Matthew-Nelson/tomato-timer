import React from 'react';
import Container from '@material-ui/core/Container';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaLaptopCode } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className={'footer-container'}>
      <Container className={'footer'} maxWidth="md">
        <p>Created by Matthew Nelson</p>
        <ul className={'external-links'}>
          <li>
            <a
              href="https://github.com/Matthew-Nelson"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/matthewbnelson/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          {/* <li><a href="https://mattnelson.dev/" target="_blank" rel="noopener noreferrer"><FaLaptopCode/></a></li> */}
        </ul>
      </Container>
    </div>
  );
}
