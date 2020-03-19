import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Dashboard from './Dashboard';
import GardenTable from './gardenTable/TablePage';

const cache = new InMemoryCache();

export const client = new ApolloClient({
  //endpoint to graphql server
  uri: process.env.REACT_APP_CLIENT_KEY,
  cache
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class App extends React.Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <Router>
        <Container>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/gardenTable' component={GardenTable} />
          </Switch >
          <Copyright />
        </Container>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
