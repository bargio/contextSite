import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export class ImgMediaCard extends React.Component {

  constructor(props) {
    super(props)
    this.onClickElement =  this.onClickElement.bind(this);
  };

  onClickElement(e){
    console.log(e);
  }

  render() {
    const app = this.props.app;
    const needDetails = this.props.needDetails;
    
    if(needDetails){
      return (
        <Card style={{maxWidth: '100%',padding:'5px'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              style={{maxWidth: '100%'}}
              image={app.img}
              title="Contemplative Reptile"
            />
            <CardContent >
              <Typography gutterBottom variant="h6" component="h2">
                {app.name}
              </Typography>
              <Typography  variant="body2" color="textSecondary" component="p">
                {app.about}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.onClickElement}>
              Share
          </Button>
            <Button size="small" color="primary">
              Learn More
          </Button>
          </CardActions>
        </Card>
      );
    }
    return (
      <Card onClick={this.onClickElement} style={{ width: '80%',padding: '5px' } } >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            style={{maxWidth: '100%'}}
            image={app.img}
            title="Contemplative Reptile"
          />
          <CardContent >
            <Typography gutterBottom variant="body2" component="p">
              {app.name}
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
