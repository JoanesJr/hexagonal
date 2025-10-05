import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {ATTR_SERVICE_NAME} from '@opentelemetry/semantic-conventions';
import { ATTR_DEPLOYMENT_ENVIRONMENT_NAME, ATTR_SERVICE_NAMESPACE } from '@opentelemetry/semantic-conventions/incubating';
import { env } from '@/shared/config/env';
export function setupTelemetry() {
  const exporter = new OTLPTraceExporter({
    url: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  })
  const sdk = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()],
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "hexagonal",
      [ATTR_SERVICE_NAMESPACE]: "node",
      [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: "production"
    })
  });

  sdk.start();
}
