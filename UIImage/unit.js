/* eslint no-unused-expressions:0 */

import UIImage from './index';
import React from 'react';

describe('UIImage', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes for the image node', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'
                         data-id='xr1' />, document.body
            );

            const node = React.findDOMNode(image.refs.image);

            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('React-supported HTML attributes as passthrough attributes for the wrapper node', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'
                         wrapperAttributes={{ 'data-id': 'xr1' }} />, document.body
            );

            const node = React.findDOMNode(image);

            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('React-supported HTML attributes as passthrough attributes for the status node', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'
                         statusAttributes={{ 'data-id': 'xr1' }} />, document.body
            );

            const node = React.findDOMNode(image.refs.status);

            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const image = React.render(
                <UIImage className='hero-image'
                         src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            const node = React.findDOMNode(image.refs.image);

            expect(node.getAttribute('class')).to.equal('ui-image hero-image');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const image = React.render(
                <UIImage className={['hero-image', 'large-image']}
                         src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            const node = React.findDOMNode(image.refs.image);

            expect(node.getAttribute('class')).to.equal('ui-image hero-image large-image');
        });
    });

    describe('CSS hook', () => {
        it('ui-image-wrapper should be rendered', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            expect(image.getWrapperClasses()).to.contain('ui-image-wrapper');
        });

        it('ui-image should be rendered', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            expect(image.getImageClasses()).to.contain('ui-image');
        });

        it('ui-image-status should be rendered', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            expect(image.getStatusClasses()).to.contain('ui-image-status');
        });
    });

    describe('description', () => {
        it('should be rendered as the HTML `alt` attribute if `props.displayAsBackgroundImage` is falsy', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'
                         alt='foo' />, document.body
            );

            const node = React.findDOMNode(image.refs.image);

            expect(node.getAttribute('alt')).to.equal('foo');
            expect(node.hasAttribute('title')).to.be.false;
        });

        it('should be rendered as the HTML `title` attribute if `props.displayAsBackgroundImage` is `true`', () => {
            const image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'
                         alt='foo'
                         displayAsBackgroundImage={true} />, document.body
            );

            const node = React.findDOMNode(image.refs.image);

            expect(node.getAttribute('title')).to.equal('foo');
            expect(node.hasAttribute('alt')).to.be.false;
        });
    });

    describe('on image status change', () => {
        let image;

        beforeEach(() => {
            image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );
        });

        it('should return the correct class hook for error', (done) => {
            image.setState({ status: UIImage.Constants.IMAGE_ERROR }, () => {
                expect(image.getStatusClasses()).to.contain('ui-image-error');
                done();
            });
        });

        it('should return the correct class hook for loading', (done) => {
            image.setState({ status: UIImage.Constants.IMAGE_LOADING }, () => {
                expect(image.getStatusClasses()).to.contain('ui-image-loading');
                done();
            });
        });

        it('should return the correct class hook for loaded', (done) => {
            image.setState({ status: UIImage.Constants.IMAGE_LOADED }, () => {
                expect(image.getStatusClasses()).to.contain('ui-image-loaded');
                done();
            });
        });
    });
});