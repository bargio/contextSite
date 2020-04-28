import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StorageResource from '../resource/Storage';


export class ImgMediaCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      imageUrl:''
    }
    this.onClickElement = this.onClickElement.bind(this);
  };

  onClickElement(e) {
    window.location.href = window.location.origin + "/atlante/" + e.descriptionID
    console.log(e);
  }

  componentWillMount(){
    StorageResource.getImage(this.props.app.image).then(value=>{
      this.setState({imageUrl:value})
    })
  }

  render() {
    const app = this.props.app;
    const needDetails = this.props.needDetails;
    console.log(app)
    return (
      <Card onClick={() => this.onClickElement(app)} style={{ width: '80%', padding: '5px', minHeight: '150px', maxHeight: '300px' }} >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={app.animalName}
            style={{ maxWidth: '100%', minHeight: '150px', maxHeight: '180px' }}
            image={this.state.imageUrl}
            title={app.animalName}
          />
          <CardContent >
            <Typography gutterBottom variant="body2" component="p">
              {app.animalName}
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
    );
  }
}
/*export default function ImgMediaCard(props) {
  const classes = useStyles();
  const app = this.props.app;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.img}
          image={app.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {app.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {app.about}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}*/
