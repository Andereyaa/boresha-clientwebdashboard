import React, {Component, Fragment} from 'react'

import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import MilkCollectionsTable from '../../containers/MilkCollectionsTable'
import CenterDateSelect from '../../containers/CenterDateSelect'

import {connect} from 'react-redux'
import {getMomentLocalToSelectedCountry} from '../../utils/dateHandling'

export class DashboardDailyView extends Component {

    state = {
        date: getMomentLocalToSelectedCountry()
    }

    handleDateChange = (date) => this.setState({date})

    getMilkCollectionsForSelectedCenterAndDate = () => {
        const {centers, milkCollections} = this.props
        const {date} = this.state
        return milkCollections.milkCollectionIds.reduce((milkCollectionsArray, milkCollectionId) => {
                    const milkCollection = milkCollections.milkCollectionsById[milkCollectionId]
                    if (
                        (milkCollection.centerId === centers.selectedId) &&
                        (getMomentLocalToSelectedCountry(milkCollection.dateCollected).isSame(date, 'day'))
                    ){
                        milkCollectionsArray.push(milkCollection)
                    }
                    return milkCollectionsArray
                }, [])
    }

    render(){
        const {date} = this.state
        const {milkCollections, periods} = this.props
        if(!milkCollections) return null
        const milkCollectionsArray = this.getMilkCollectionsForSelectedCenterAndDate()
        
        return (
            <Fragment>         
                {
                    periods.currentPeriodId ?
                    <CenterDateSelect value={date} onSelect={this.handleDateChange}/>
                    :
                    null
                }
                <DailyStatisticsPanel milkCollectionsArray={milkCollectionsArray}/>
                <MilkCollectionsTable milkCollectionsArray={milkCollectionsArray}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    milkCollections: state.milkCollections,
    periods: state.periods
})
export default connect(mapStateToProps)(DashboardDailyView)