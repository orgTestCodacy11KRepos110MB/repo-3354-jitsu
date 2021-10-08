import { intType, SourceCollection, stringType } from 'catalog/sources/types';

export const mockJitsuAirbyteSourcesStreams: SourceCollection[] = [
  [
    {
      // displayName: 'Funnels',
      id: 'funnels',
      displayName: 'Stream',
      type: stringType,
      constant: 'funnels'
    },
    {
      id: 'funnel_id',
      displayName: 'funnel_id',
      type: intType,
      constant: 'integer'
    },
    {
      id: 'funnel_id',
      displayName: 'funnel_id',
      type: intType,
      constant: 'integer'
    }
  ]
];
const a = [
  {
    name: 'funnels',
    json_schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      additionalProperties: false,
      properties: {
        funnel_id: { type: ['null', 'integer'] },
        name: { type: ['null', 'string'] },
        date: { type: ['null', 'string'], format: 'date' },
        datetime: { type: ['null', 'string'], format: 'date-time' },
        steps: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: ['null', 'object'],
                additionalProperties: true,
                properties: {
                  count: { type: ['null', 'integer'] },
                  avg_time: { type: ['null', 'number'], multipleOf: 1e-20 },
                  avg_time_from_start: {
                    type: ['null', 'number'],
                    multipleOf: 1e-20
                  },
                  goal: { type: ['null', 'string'] },
                  overall_conv_ratio: {
                    type: ['null', 'number'],
                    multipleOf: 1e-20
                  },
                  step_conv_ratio: {
                    type: ['null', 'number'],
                    multipleOf: 1e-20
                  },
                  event: { type: ['null', 'string'] },
                  session_event: { type: ['null', 'string'] },
                  step_label: { type: ['null', 'string'] },
                  selector: { type: ['null', 'string'] },
                  selector_params: {
                    type: ['null', 'object'],
                    additionalProperties: true,
                    properties: { step_label: { type: ['null', 'string'] } }
                  },
                  time_buckets_from_start: {
                    type: ['null', 'object'],
                    additionalProperties: false,
                    properties: {
                      lower: { type: ['null', 'integer'] },
                      higher: { type: ['null', 'integer'] },
                      buckets: {
                        anyOf: [
                          { type: 'array', items: { type: 'integer' } },
                          { type: 'null' }
                        ]
                      }
                    }
                  },
                  time_buckets_from_prev: {
                    type: ['null', 'object'],
                    additionalProperties: false,
                    properties: {
                      lower: { type: ['null', 'integer'] },
                      higher: { type: ['null', 'integer'] },
                      buckets: {
                        anyOf: [
                          { type: 'array', items: { type: 'integer' } },
                          { type: 'null' }
                        ]
                      }
                    }
                  }
                }
              }
            },
            { type: 'null' }
          ]
        },
        analysis: {
          type: ['null', 'object'],
          additionalProperties: false,
          properties: {
            completion: { type: ['null', 'integer'] },
            starting_amount: { type: ['null', 'integer'] },
            steps: { type: ['null', 'integer'] },
            worst: { type: ['null', 'integer'] }
          }
        }
      }
    },
    supported_sync_modes: ['full_refresh', 'incremental'],
    source_defined_cursor: true,
    default_cursor_field: ['date'],
    source_defined_primary_key: [['funnel_id'], ['date']]
  }
] as const;