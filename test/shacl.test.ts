import {JsonLdParser} from 'jsonld-streaming-parser'
import * as fs from 'fs'
import factory from 'rdf-ext'
import SHACLValidator from 'rdf-validate-shacl'
import ValidationReport from 'rdf-validate-shacl'
import DatasetExt from 'rdf-ext/lib/Dataset'

describe('Dataset', () => {
    it('validates against SHACL', async () => {
        const datasets = listDatasets()

        const validator = await shaclValidator()
        for (const dataset of datasets) {
            const jsonLdParser = new JsonLdParser()
            const data = await factory.dataset().import(
                fs.createReadStream('catalog/' + dataset).pipe(jsonLdParser)
            )
            expect(containsDatasetNode(data)).toBe(true)

            const report = await validator.validate(data)
            expect(report).toConform()
        }
    })
})

const listDatasets = () => fs.readdirSync('catalog/')

const containsDatasetNode = (data: DatasetExt): boolean => data.match(
    null,
    factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    factory.namedNode('http://schema.org/Dataset')
).length > 0

const shaclValidator = async (): Promise<typeof SHACLValidator> => {
    const jsonLdParser = new JsonLdParser()
    const shapes = await factory.dataset().import(
        jsonLdParser.import(fs.createReadStream('shacl/dataset.jsonld'))
    )
    return new SHACLValidator(shapes, {factory})
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toConform(): R
        }
    }
}

expect.extend({
    toConform(report: typeof ValidationReport) {
        return {
            pass: report.conforms,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message: () => report.results.map((result: any) =>
                result.message + ' for ' + result.path.value + ' at ' + result.focusNode.value
            )
        }
    }
})