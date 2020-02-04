import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { ProgressBar } from 'react-bootstrap';

export class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      toReach: 0,
      show: false,
    }
    window.progressbar = this
  }

  updateProgress = (value) => {
    this.setState({ toReach: value, show:true })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.progress < this.state.toReach) {
        this.setState({ progress: this.state.progress + 1 })
      } else if (this.state.progress < this.state.toReach) {
        this.setState({ progress: 0, toReach: 0, show:false })
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        {this.state.show &&
          <ProgressBar show={false} animated style={{ minWidth: '100%', position: "absolute", bottom: '0', zIndex: '100' }} now={this.state.progress}></ProgressBar>
        }
      </div>
    );
  }


  /*<MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                  <MDBRow>
                    <MDBCol md="6">
                      <h5 className="title">Footer Content</h5>
                      <p>
                        Here you can use rows and columns here to organize your footer
                        content.
                      </p>
                    </MDBCol>
                    <MDBCol md="6">
                      <h5 className="title">Links</h5>
                      <ul>
                        <li className="list-unstyled">
                          <a href="#!">Link 1</a>
                        </li>
                        <li className="list-unstyled">
                          <a href="#!">Link 2</a>
                        </li>
                        <li className="list-unstyled">
                          <a href="#!">Link 3</a>
                        </li>
                        <li className="list-unstyled">
                          <a href="#!">Link 4</a>
                        </li>
                      </ul>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                  <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="#"> Test.com </a>
                  </MDBContainer>
                </div>
              </MDBFooter>*/
}