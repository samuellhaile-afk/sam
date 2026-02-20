# Social Media Marketing Tools

class SocialMediaMarketing:
    def __init__(self):
        self.tools = []

    def add_tool(self, tool):
        self.tools.append(tool)

    def list_tools(self):
        return self.tools

    def analyze_performance(self, metrics, aggregator=None):
        # If a real aggregator is provided, delegate to it for live metrics
        if aggregator is not None:
            summary = aggregator.overall()
            return {m: getattr(summary, m, self._dummy_analysis(m)) for m in metrics}
        # Dummy implementation for performance analysis (backward-compatible)
        return {metric: self._dummy_analysis(metric) for metric in metrics}

    def _dummy_analysis(self, metric):
        return f'Analyzed {metric}'
        
# Example Usage
if __name__ == '__main__':
    marketing_tools = SocialMediaMarketing()
    marketing_tools.add_tool('Buffer')
    marketing_tools.add_tool('Hootsuite')
    print(marketing_tools.list_tools())
    print(marketing_tools.analyze_performance(['engagement', 'reach']))