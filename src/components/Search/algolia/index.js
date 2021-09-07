import React, { createRef } from 'react';
import {
  InstantSearch,
  Index,
  Hits,
  Configure,
  connectStateResults,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { HitsWrapper } from '../Hits';
import config from 'config';
import Input from './input';
import { PageHit } from './hitComps';
import styled from '@emotion/styled';
import SearchStatus from '../Status';
import Pagination from './pagination';
import Stats from './stats';

const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

// const Results = connectStateResults(
//   ({ searching, searchState: state, searchResults: res }) =>
//     (searching && `Searching...`) || (res && res.nbHits === 0 && `No results for '${state.query}'`)
// );

const Results = connectStateResults(({ searching, searchState: state, searchResults: res }) => (
  <SearchStatus noHits={res && res.nbHits === 0} searching={searching} query={state.query} />
));

class Algolia extends React.Component {
  state = {
    query: '',
    focus: false,
  };

  constructor(props) {
    super(props);
    this.searchClient = algoliasearch(
      config.features.search.algoliaAppId,
      config.features.search.algoliaSearchKey
    );
    this.ref = createRef();
    this.inputRef = props.inputRef;
    this.index = props.index;
  }

  render() {
    const ref = this.ref;
    const focus = this.focus;
    const showResults = this.state.query.length > 1 && this.state.focus;
    return (
      <InstantSearch
        searchClient={this.searchClient}
        indexName={this.index}
        onSearchStateChange={({ query }) => this.setState({ query: query })}
        root={{ Root, props: { ref } }}
      >
        <Input
          inputRef={this.inputRef}
          onFocus={() => this.setState({ focus: true })}
          {...{ focus }}
        />

        <div style={{ flex: '1' }}>
          {showResults && config.features.search.showStats ? (
            <div>
              <Stats />
            </div>
          ) : null}
          <Results />
          <HitsWrapper>
            <Index key={this.index} indexName={this.index}>
              {showResults ? (
                <>
                  <Hits hitComponent={PageHit} />
                </>
              ) : (
                ''
              )}
            </Index>
          </HitsWrapper>
        </div>
        {showResults && config.features.search.pagination.enabled ? (
          <Pagination
            totalPages={config.features.search.pagination.totalPages}
            showPrevious={config.features.search.pagination.showPrevious}
            showNext={config.features.search.pagination.showNext}
          />
        ) : null}
        <Configure
          hitsPerPage={config.features.search.hitsPerPage}
          attributesToSnippet={[`excerpt:${config.features.search.snippetLength}`]}
          snippetEllipsisText={'...'}
        />
      </InstantSearch>
    );
  }
}

export default Algolia;
