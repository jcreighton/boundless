/* eslint no-unused-expressions:0 */

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        window.setTimeout(callback, 0);
    };
}

import React from 'react';
import ReactDOM from 'react-dom';

import UITable from '../../UITable';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

const rows = [{"id":1,"first_name":"Louise","last_name":"Fernandez","job_title":"Database Administrator I","phone":"6-(697)972-8601","email":"lfernandez1@opera.com","address1":"5049 Barnett Road","city":"Nglengkir","country":"Indonesia","country_code":"ID"},{"id":2,"first_name":"Dennis","last_name":"Nichols","job_title":"Nurse","phone":"9-(896)552-6623","email":"dnichols0@ycombinator.com","address1":"0 Drewry Drive","city":"Canggetelo","country":"Indonesia","country_code":"ID"},{"id":3,"first_name":"Stephen","last_name":"Hamilton","job_title":"Dental Hygienist","phone":"1-(274)517-4270","email":"shamilton2@amazon.co.jp","address1":"11 David Crossing","city":"Kotabaru","country":"Indonesia","country_code":"ID"},{"id":4,"first_name":"Shawn","last_name":"Richards","job_title":"Librarian","phone":"1-(173)205-8062","email":"srichards3@4shared.com","address1":"47533 Sherman Street","city":"Viengxay","country":"Laos","country_code":"LA"},{"id":5,"first_name":"John","last_name":"Hansen","job_title":"Staff Scientist","phone":"5-(650)401-5661","email":"jhansen4@sfgate.com","address1":"955 Jackson Park","city":"South Tangerang","country":"Indonesia","country_code":"ID"},{"id":6,"first_name":"Ronald","last_name":"Alexander","job_title":"Structural Engineer","phone":"7-(675)732-2723","email":"ralexander5@usgs.gov","address1":"0858 Hooker Court","city":"Kardítsa","country":"Greece","country_code":"GR"},{"id":7,"first_name":"Shawn","last_name":"Myers","job_title":"Executive Secretary","phone":"0-(903)830-7054","email":"smyers6@addtoany.com","address1":"69605 Rusk Junction","city":"Erpeldange","country":"Luxembourg","country_code":"LU"},{"id":8,"first_name":"Andrew","last_name":"Hill","job_title":"Research Nurse","phone":"9-(825)250-8207","email":"ahill7@sohu.com","address1":"4 Lunder Junction","city":"Naji","country":"China","country_code":"CN"},{"id":9,"first_name":"Susan","last_name":"Fowler","job_title":"Product Engineer","phone":"2-(891)897-3096","email":"sfowler8@addtoany.com","address1":"17 Artisan Pass","city":"Oslomej","country":"Macedonia","country_code":"MK"},{"id":10,"first_name":"Denise","last_name":"Gonzalez","job_title":"Associate Professor","phone":"7-(665)859-5877","email":"dgonzalez9@answers.com","address1":"8538 Sage Hill","city":"Baiima","country":"Sierra Leone","country_code":"SL"}];

// index 3 is for the ui-row-loading css hook test
const rowGetter = index => index === 3 ? new Promise(noop) : rows[index];

const columns = [{title:'FirstName',mapping:'first_name',resizable:true},{title:'LastName',mapping:'last_name',resizable:true},{defaultWidth:100,title:'JobTitle',mapping:'job_title',resizable:true},{title:'Phone',mapping:'phone',resizable:true},{title:'EmailAddress',mapping:'email',resizable:true},{title:'StreetAddress',mapping:'address1',resizable:true},{title:'City',mapping:'city',resizable:true},{title:'Country',mapping:'country',resizable:true},{title:'CountryCode',mapping:'country_code',resizable:true}];

const baseProps = {
    getRow: rowGetter,
    columns: columns,
    totalRows: rows.length
};

describe('UITable', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITable, baseProps));

    describe('CSS hooks', () => {
        let element;

        beforeEach(() => element = render(<UITable {...baseProps} />));

        it('ui-table-wrapper should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.className).toContain('ui-table-wrapper');
        });

        it('ui-table should be rendered', () => {
            expect(element.refs.table.className).toContain('ui-table');
        });

        it('ui-table-body should be rendered', () => {
            expect(element.refs.body.className).toContain('ui-table-body');
        });

        it('ui-table-row should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row:not(.ui-table-header-row)')).not.toBe(null);
        });

        it('ui-table-row-even should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row-even')).not.toBe(null);
        });

        it('ui-table-row-odd should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row-odd')).not.toBe(null);
        });

        it('ui-table-row-loading should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-row-loading')).not.toBe(null);
        });

        it('ui-table-cell should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-cell')).not.toBe(null);
        });

        it('ui-table-header-row should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-header-row')).not.toBe(null);
        });

        it('ui-table-header-cell should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-header-cell')).not.toBe(null);
        });

        it('ui-table-header-cell-resize-handle should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-header-cell-resize-handle')).not.toBe(null);
        });

        it('ui-table-x-scroller should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-x-scroller')).not.toBe(null);
        });

        it('ui-table-x-scroller-nub should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-x-scroller-nub')).not.toBe(null);
        });

        it('ui-table-y-scroller should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-y-scroller')).not.toBe(null);
        });

        it('ui-table-y-scroller-nub should be rendered', () => {
            const node = element.refs.wrapper;

            expect(node.querySelector('.ui-table-y-scroller-nub')).not.toBe(null);
        });
    });

    describe('click functionality', () => {
        it('should make a row active', () => {
            const element = render(<UITable {...baseProps} />);

            expect(element.state.currentActiveRowIndex).not.toBe(0);

            element.handleRowClick(null, rowGetter(0));
            expect(element.state.currentActiveRowIndex).toBe(0);

            element.handleRowClick(null, rowGetter(4));
            expect(element.state.currentActiveRowIndex).toBe(4);
        });

        it('should call `onRowInteract` with the event and row data', () => {
            const stub = sandbox.stub();
            const element = render(<UITable {...baseProps} onRowInteract={stub} />);

            element.refs.body.querySelector('.ui-table-row').click();

            expect(stub.calledWith(sinon.match.object, rowGetter(0))).toBe(true);
        });

        it('should call `onCellInteract` with the event, row data and cell content', () => {
            const stub = sandbox.stub();
            const element = render(<UITable {...baseProps} onCellInteract={stub} />);

            element.refs.body.querySelector('.ui-table-cell').click();

            expect(stub.calledWith(sinon.match.object, rowGetter(0), rowGetter(0)[columns[0].mapping])).toBe(true);
        });
    });

    describe('arrow key functionality', () => {
        let element;

        beforeEach(() => element = render(<UITable {...baseProps} />));

        it('should move the active row on down arrow', () => {
            expect(element.state.currentActiveRowIndex).not.toBe(0);

            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.state.currentActiveRowIndex).toBe(0);
        });

        it('should move the active row on up arrow', () => {
            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.state.currentActiveRowIndex).toBe(1);

            element.handleKeyDown({
                key: 'ArrowUp',
                preventDefault: noop
            });

            expect(element.state.currentActiveRowIndex).toBe(0);
        });
    });

    describe('for screen readers', () => {
        let element;

        beforeEach(() => element = render(<UITable {...baseProps} />));

        it('the first column content should be spoken aloud on arrow down', () => {
            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            expect(element.state.ariaSpokenOutput).toBe(rowGetter(0)[columns[0].mapping]);
        });

        it('the whole row content should be spoken aloud on enter', () => {
            element.handleKeyDown({
                key: 'ArrowDown',
                preventDefault: noop
            });

            element.handleKeyDown({
                key: 'Enter',
                preventDefault: noop
            });

            const rowData = rowGetter(0);

            columns.forEach(({title, mapping}) => {
                expect(element.state.ariaSpokenOutput).toContain(`${title}: ${rowData[mapping]}`);
            });
        });
    });

    describe('row rotation', () => {
        it('should occur when scrolled down', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);
            const firstRowData = element.state.rows[0].data;

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            expect(element.state.rows[0].data).not.toBe(firstRowData);
        });

        it('should occur when scrolled up', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: 200,
                preventDefault: noop
            });

            const firstRowData = element.state.rows[0].data;

            element.handleMoveIntent({
                deltaX: 0,
                deltaY: -200,
                preventDefault: noop
            });

            expect(element.state.rows[0].data).not.toBe(firstRowData);
        });

        it('should occur on left-click drag of the y scroll nub', () => {
            const element = render(<UITable {...baseProps} style={{height: '150px'}} />);
            const firstRowData = element.state.rows[0].data;

            // simulate drag cascade
            element.handleYScrollerDragStart({button: 0, clientY: 0});
            element.handleDragMove({button: 0, clientY: 200});
            element.handleDragEnd();

            expect(element.state.rows[0].data).not.toBe(firstRowData);
        });
    });

    describe('scroll nub sizing', () => {
        it('y nub should calculate height correctly', () => {
            const element = render(<UITable {...baseProps} />);
            const ynub = element.refs.yScrollerNub;

            // rendering 4 rows, 150px container height, so 150 * (5 rendered rows / 10 total rows)
            // it's hardcoded to 150px height in the component as a fallback since JSDOM doesn't have a layout engine
            expect(ynub.style.height).toBe('75px');
        });

        it('x nub should calculate height correctly', () => {
            const element = render(<UITable {...baseProps} />);
            const xnub = element.refs.xScrollerNub;

            // rendering 4 rows, 500px container width, all the columns fit inside, so it should be max width
            // it's hardcoded to 500px width in the component as a fallback since JSDOM doesn't have a layout engine
            expect(xnub.style.width).toBe('500px');
        });
    });
});
